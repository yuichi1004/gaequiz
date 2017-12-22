package hello

import (
	"encoding/json"
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

func scoreHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case "GET":
		scoreGetHandler(w, r)
	case "POST":
		scorePostHandler(w, r)
	default:
		w.WriteHeader(http.StatusNotFound)
	}
}

func scorePostHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	var s Score
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&s); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	key := datastore.NewKey(ctx, "Score", s.Name, 0, nil)
	if _, err := datastore.Put(ctx, key, &s); err != nil {
		log.Errorf(ctx, "failed to register score: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Infof(ctx, "New score registerd: %+v", s)

	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.Encode(&s)
}

func scoreGetHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	var scores []*Score
	query := datastore.NewQuery("Score").Limit(5).Order("-Score")
	_, err := query.GetAll(ctx, &scores)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.Encode(&scores)
}
