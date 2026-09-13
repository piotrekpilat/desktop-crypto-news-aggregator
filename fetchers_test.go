package main

import (
	"testing"
)

func TestDefaultSourcesConfig(t *testing.T) {
	sources := GetDefaultSources()
	if len(sources) < 20 {
		t.Fatalf("Expected at least 20 default sources, got %d", len(sources))
	}

	seenIDs := make(map[string]bool)
	for _, s := range sources {
		if s.ID == "" {
			t.Errorf("Source with empty ID found: %+v", s)
		}
		if seenIDs[s.ID] {
			t.Errorf("Duplicate source ID found: %s", s.ID)
		}
		seenIDs[s.ID] = true

		if s.Name == "" {
			t.Errorf("Source %s has empty name", s.ID)
		}
		if s.URL == "" {
			t.Errorf("Source %s has empty URL", s.ID)
		}
		// Requirement: All default sources must be disabled by default (IsActive = false)
		if s.IsActive {
			t.Errorf("Source %s (%s) should be disabled by default (IsActive=false), but is true", s.ID, s.Name)
		}
	}
}

func TestFetchLiveDefaultSources(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping live feed test in short mode")
	}

	sources := GetDefaultSources()
	fc := NewFeedClient()

	for _, s := range sources {
		if s.ID == "cp_api" {
			// CryptoPanic requires API key, tested separately or skipped if no token
			continue
		}

		t.Run(s.Name, func(t *testing.T) {
			items, err := fc.FetchSource(s, "")
			if err != nil {
				t.Logf("Source %s (%s) returned error (may be network-dependent): %v", s.ID, s.URL, err)
				return
			}
			t.Logf("Source %s returned %d items", s.ID, len(items))
			if len(items) > 0 {
				first := items[0]
				if first.Title == "" {
					t.Errorf("Source %s returned item with empty title", s.ID)
				}
				if first.Source == "" {
					t.Errorf("Source %s returned item with empty source name", s.ID)
				}
			}
		})
	}
}
