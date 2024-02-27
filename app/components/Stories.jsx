import { storyList } from "../src/storylist";
import StoryCard from "./StoryCard";


export default function Stories() {
  return (
  <div>
     
     <div className="flex justify-start items-center scrollbar-hide overflow-x-scroll space-x-3 mx-auto">

{storyList.map(( story ) => <StoryCard key={story.name} src={story.src} profile={story.profile} name={story.name} />)}

</div>
   
  </div>
  )
}
