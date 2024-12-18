import { Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNews } from "../api/getNews";
import { CepModal } from "../components/cep-modal";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NewsCard } from "../components/news-card";
import { Dialog, DialogTrigger } from "../components/ui/dialog";

export interface NewsCardProps {
  article_id: string;
  title: string;
  image_url: string;
  link: string;
  description: string;
}

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string | null>(
    searchParams.get("query") || ""
  );
  const [category, setCategory] = useState<string | null>(
    searchParams.get("category") || ""
  );
  const [apiError, setApiError] = useState(false);

  const [news, setNews] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cep") && !searchParams.get("query")) {
      setSearch(localStorage.getItem("cep"));
      updateUrlParams(search, category);
    }
  }, []);

  useEffect(() => {
    if (search !== "" || category !== "") {
      getNews(search, category)
        .then((res) => {
          setApiError(false);
          setNews(res.results);
        })
        .catch(() => {
          setApiError(true);
        });
    }
  }, [searchParams]);

  function updateUrlParams(
    newQuery: string | null,
    newCategory: string | null
  ) {
    const params: any = {};
    if (newQuery) params.query = newQuery;
    if (newCategory) params.category = newCategory;

    setSearchParams(params);
  }

  function handleSearchNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateUrlParams(search, category);
  }

  function toggleRadio(value: string) {
    if (category === value) {
      setCategory("");
      updateUrlParams(search, "");
    } else {
      setCategory(value);
      updateUrlParams(search, value);
    }
  }

  return (
    <Dialog>
      <Header />
      <main className="flex items-center justify-center mt-6 flex-col gap-14">
        <div className="flex justify-end items-center w-full mr-32">
          <DialogTrigger asChild>
            <button className="bg-zinc-300 flex items-center p-2 rounded-lg">
              Cadastrar CEP
            </button>
          </DialogTrigger>
        </div>

        <form className="flex items-center" onSubmit={handleSearchNews}>
          <input
            type="text"
            className="rounded-lg w-96 h-8 p-2"
            placeholder="Pesquise alguma notícia"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            autoFocus
          />
          <button className="flex items-center flex-col justify-center ml-[-1.5em]">
            <Search className="text-zinc-800 size-5" />
          </button>
        </form>

        <section className="flex w-[81%] gap-10 ">
          <label className="cursor-pointer bg-zinc-700 p-2 rounded-md hover:bg-zinc-800 has-[:checked]:bg-zinc-900 transition-colors">
            <input
              type="radio"
              name="filters"
              className="hidden"
              checked={category === "sports"}
              onClick={() => toggleRadio("sports")}
              value="sports"
            />
            <span className="text-zinc-200">Esportes</span>
          </label>

          <label className="cursor-pointer bg-zinc-700 p-2 rounded-md hover:bg-zinc-800 has-[:checked]:bg-zinc-900 transition-colors">
            <input
              type="radio"
              name="filters"
              className="hidden"
              checked={category === "health"}
              onClick={() => toggleRadio("health")}
              value="health"
            />
            <span className="text-zinc-200">Saúde</span>
          </label>

          <label className="cursor-pointer bg-zinc-700 p-2 rounded-md hover:bg-zinc-800 has-[:checked]:bg-zinc-900 transition-colors">
            <input
              type="radio"
              name="filters"
              className="hidden"
              checked={category === "food"}
              onClick={() => toggleRadio("food")}
              value="food"
            />
            <span className="text-zinc-200">Comida</span>
          </label>

          <label className="cursor-pointer bg-zinc-700 p-2 rounded-md hover:bg-zinc-800 has-[:checked]:bg-zinc-900 transition-colors">
            <input
              type="radio"
              name="filters"
              className="hidden"
              checked={category === "science"}
              onClick={() => toggleRadio("science")}
              value="science"
            />
            <span className="text-zinc-200">Ciência</span>
          </label>

          <label className="cursor-pointer bg-zinc-700 p-2 rounded-md hover:bg-zinc-800 has-[:checked]:bg-zinc-900 transition-colors">
            <input
              type="radio"
              name="filters"
              className="hidden"
              checked={category === "entertainment"}
              onClick={() => toggleRadio("entertainment")}
              value="entertainment"
            />
            <span className="text-zinc-200">Entretenimento</span>
          </label>
        </section>

        {news.length > 0 ? (
          <div className="flex items-center flex-wrap w-full p-4 gap-6 justify-center">
            {news.map((item: NewsCardProps) => {
              return <NewsCard data={item} key={item.article_id} />;
            })}
          </div>
        ) : (
          <p
            className={`mt-6 font-bold text-xl ${
              apiError ? "text-red-800" : "text-zinc-900"
            }`}
          >
            {apiError
              ? "Erro na requisição da API, tente novamente mais tarde"
              : "Nenhuma noticia encontrada"}
          </p>
        )}
      </main>

      <CepModal />
      <Footer />
    </Dialog>
  );
}
