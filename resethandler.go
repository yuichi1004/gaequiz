package hello

import (
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

func resetHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	{
		var quizCol []*Quiz
		query := datastore.NewQuery("Quiz").Limit(100)
		keys, err := query.GetAll(ctx, &quizCol)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		for _, k := range keys {
			if err := datastore.Delete(ctx, k); err != nil {
				log.Errorf(ctx, "failed to delete quiz: %v", err)
			}
		}
	}

	{
		var scores []*Score
		query := datastore.NewQuery("Score").Limit(100)
		keys, err := query.GetAll(ctx, &scores)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		for _, k := range keys {
			if err := datastore.Delete(ctx, k); err != nil {
				log.Errorf(ctx, "failed to delete quiz: %v", err)
			}
		}
	}
}
