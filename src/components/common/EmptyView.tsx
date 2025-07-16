import { EmptyViewProps } from "../../types/book";
import { AddBookButton } from "./AddBookButton";

export const EmptyView = ({ data }: EmptyViewProps) => {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 h-[calc(100vh-15rem)] text-center">
      <img src={data.image} alt="" className="w-70 h-auto" />

      <h2 className="text-xl font-semibold mt-6 lg:text-2xl">{data.title}</h2>
      <p className="text-base text-center max-w-md mb-5">{data.description}</p>
      <AddBookButton />
    </section>
  );
};
