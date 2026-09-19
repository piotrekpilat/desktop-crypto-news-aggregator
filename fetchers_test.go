package main

import (
	"testing"
)

func TestDefaultSourcesConfig(t *testing.T) {
	sources := GetDefaultSources()
	if len(sources) < 25 {
		t.Fatalf("Expected at least 25 default sources, got %d", len(sources))
	}

	seenIDs := make(map[string]bool)
	var foundDonald, foundEric, foundVlad bool

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
		if s.Type == "" {
			t.Errorf("Source %s has empty Type", s.ID)
		}
		// Requirement: All default sources must be disabled by default (IsActive = false)
		if s.IsActive {
			t.Errorf("Source %s (%s) should be disabled by default (IsActive=false), but is true", s.ID, s.Name)
		}

		if s.ID == "x_realdonaldtrump" {
			foundDonald = true
			if s.Type != FeedSourceTypeX {
				t.Errorf("Expected Donald Trump to have type %s, got %s", FeedSourceTypeX, s.Type)
			}
		}
		if s.ID == "x_erictrump" {
			foundEric = true
			if s.Type != FeedSourceTypeX {
				t.Errorf("Expected Eric Trump to have type %s, got %s", FeedSourceTypeX, s.Type)
			}
		}
		if s.ID == "x_vladtenev" {
			foundVlad = true
			if s.Type != FeedSourceTypeX {
				t.Errorf("Expected Vlad Tenev to have type %s, got %s", FeedSourceTypeX, s.Type)
			}
		}
	}

	if !foundDonald {
		t.Errorf("Default sources should contain x_realdonaldtrump")
	}
	if !foundEric {
		t.Errorf("Default sources should contain x_erictrump")
	}
	if !foundVlad {
		t.Errorf("Default sources should contain x_vladtenev")
	}
}

func TestFetchLiveDefaultSources(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping live feed test in short mode")
	}

	sources := GetDefaultSources()
	fc := NewFeedClient()

	for _, s := range sources {
		// Pomijamy CryptoPanic jeśli brak tokena API
		if s.Type == FeedSourceTypeCryptoPanic || s.ID == "cp_api" {
			continue
		}

		// Pomijamy źródła X (Twitter) w testach, bo wymagają aktywnej sesji/ciasteczek
		if s.Type == FeedSourceTypeX {
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
