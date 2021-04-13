const API_KEY = "48f6e1a83c41f806ee1e4dfe7234d545";
const API_BASE = "https://api.themoviedb.org/3";
// precisa pegar***
/*
- originais netflix
- recomendados (recommend)
- em alta (trending)
- ação
- comédia
- terror
- romance
- documentário
*/

const basicFetch = async (endpoint) => {
    const requisition = await fetch(`${API_BASE}${endpoint}`)
    const json = await requisition.json()
    return json
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: "originals", title: "Netflix Originals", items: await basicFetch(`/discover/tv?with_network=213&api_key=${API_KEY}`),
            },
            {
                slug: "trending", title: "Recommend for you", items: await basicFetch(`/trending/movie/week?api_key=${API_KEY}`),
            },
            {
                slug: "top-rated", title: "Top-Rated", items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}`),
            },
            {
                slug: "action", title: "Action", items: await basicFetch(`/discover/movie?with_genres=28&api_key=${API_KEY}`),
            },
            {
                slug: "comedy", title: "Comedy", items: await basicFetch(`/discover/movie?with_genres=35&api_key=${API_KEY}`),
            },
            {
                slug: "horror", title: "Horror", items: await basicFetch(`/discover/movie?with_genres=27&api_key=${API_KEY}`),
            },
            {
                slug: "romance", title: "Romance", items: await basicFetch(`/discover/movie?with_genres=10749&api_key=${API_KEY}`),
            },
            {
                slug: "documentary", title: "Documentary", items: await basicFetch(`/discover/movie?with_genres=99&api_key=${API_KEY}`)
            }
        ]
    },

    getMovieInfo: async (movieId, type) => {
        let info = {}

            if(movieId) {
                switch(type) {
                    case "movie":
                        info = await basicFetch(`/movie/${movieId}?api_key=${API_KEY}`)
                    break;

                    case "tv":
                        info = await basicFetch(`/tv/${movieId}?api_key=${API_KEY}`)
                    break;

                    default:
                        info = null
                }
            }
            return info
        }
    }