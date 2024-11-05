import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNews } from "../api/getNews";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NewsCardProps } from "./home";

export function Details() {
  interface AllDataProps extends NewsCardProps {
    pubDate: string;
  }

  const { articleId, category, query } = useParams();

  const [news, setNews] = useState<AllDataProps>();

  useEffect(() => {
    getNews(query, category).then((res) => {
      const filteredArray = res.results.filter(
        (item: NewsCardProps) => item.article_id === articleId
      );
      setNews(filteredArray[0]);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center">
        <section className="flex w-[90%] bg-zinc-300 mt-20 p-10 rounded-md gap-10 flex-col items-center">
          <h1 className="font-bold text-lg">{news?.title}</h1>
          <div className="flex flex-col items-center gap-2">
            <img
              src={news?.image_url}
              alt="Imagem da noticia"
              className="max-w-[700px] max-h-[500px]"
            />
            <a
              className="underline text-blue-700 bottom-0 relative"
              href={news?.link}
              target="_blank"
            >
              Noticia original
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span>
              {news?.description !== null
                ? news?.description
                : "Não há descrição nesta notícia"}
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}