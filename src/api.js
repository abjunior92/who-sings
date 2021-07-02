import axios from "axios";
import _ from "lodash";

export const apiKey = `${process.env.REACT_APP_APIKEY}`;

const root = `/ws/1.1/`;

export const endpoint = {
  chartTracksGet: `${root}chart.tracks.get`,
  trackSnippetGet: `${root}track.snippet.get`
};

export async function fetchChartTracks() {
  return await axios
    .get(`${endpoint.chartTracksGet}`, {
      params: {
        apikey: apiKey,
        country: "IT",
        chart_name: "top",
        page_size: 10,
        page: 1,
        f_has_lyrics: true
      }
    })
    .then(function (response) {
      const resp = response?.data?.message?.body?.track_list;

      const tracks = Promise.resolve(
        _.reduce(
          resp,
          async (acc, t) => {
            const s = await fetchSnippetLyric(t?.track?.track_id);
            return acc.then(async a => {
              return [
                ...a,
                {
                  track_id: t?.track?.track_id,
                  artist: t?.track?.artist_name,
                  artist_id: t?.track?.artist_id,
                  lyric_snippet: s
                }
              ];
            });
          },
          Promise.resolve([])
        )
      );
      return tracks;
    })
    .then(function (response) {
      return response;
    });
}

async function fetchSnippetLyric(track_id) {
  return await axios
    .get(`${endpoint.trackSnippetGet}`, {
      params: {
        apikey: apiKey,
        track_id
      }
    })
    .then(function (response) {
      return response?.data?.message?.body?.snippet?.snippet_body;
    });
}
