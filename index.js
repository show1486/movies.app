const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0NTJkZDQ2ZTkwYTA0MWEwNGJlMzBiNzdmMmQ3ZSIsInN1YiI6IjY1ZTgxYmQxNDJmMTlmMDE4NzhkNzdkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zW858EaTQE30E8LoiNFa8Z1eqEebWfAllpm9T8pwmus",
  },
};

let movies;
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    movies = response.results;
    // 메인화면 출력
    rendermovie(movies);
    search();
  });

// 1. 메인 화면 만들기
function rendermovie(data) {
  const sec = document.querySelector(".section");
  sec.innerHTML = "";
  data.forEach((movie) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src = "https://image.tmdb.org/t/p/w500/${movie.backdrop_path}"/>
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    `;
    const section = document.querySelector(".section");
    section.append(div);
    div.addEventListener("click", () => {
      const id = movie.id;
      alert("영화의 id 값은" + id + "입니다");
    });
  });
}

// 2. 검색 기능만들기
function search() {
  const input = document.querySelector("#searchinput");
  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clickHander();
  });

  function clickHander() {
    const moviefilter = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(input.value.toLowerCase());
    });
    // console.log(moviefilter);

    moviefilter.length ? rendermovie(moviefilter) : rendermovienone();

    function rendermovienone() {
      const sections = document.querySelector(".section");
      sections.innerHTML = "";
      sections.textContent = `해당영화가 없어요`;
      console.log("해당영화없음");
    }
    // 리턴값이 해당영화 출력함수
  }
}
