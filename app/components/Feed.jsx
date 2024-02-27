import InputBox from "./InputBox";
import ShowPosts from "./ShowPosts";
import Stories from "./Stories";


export default function Feed() {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 xl:mx-8 overflow-y-auto scrollbar-hide">
        <div className="mx-auto px-3 max-w-md md:max-w-lg lg:max-w-2xl">
          {/*Stories*/}
        <Stories />

          {/*InputBox*/}
          <InputBox />
          {/*Posts*/}

         
     <ShowPosts />
        </div>
    </div>
  )
}
