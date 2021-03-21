import "./App.css";
import MicroBlogs from "./MicroBlogs";
import Count from "./Count";

function App() {
  return (
    <div className="mx-5 md:mx-auto md:w-3/5 md:grid md:grid-cols-4 md:gap-x-5">
      <header className="flex justify-between items-end py-3 col-span-3">
        <h1 className="text-3xl font-medium">Josscii 的个人微博</h1>
        <Count />
      </header>
      <article className="col-span-3">
        <MicroBlogs />
      </article>
      <aside className="hidden md:block">
        <div className="border rounded p-2">
          <p>关于我</p>
          <p>不专业 iOS 程序员，喜欢 Swift，React，学习前端中。</p>
        </div>
      </aside>
    </div>
  );
}

export default App;
