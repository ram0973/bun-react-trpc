//import { trpc } from '@/app'

// export const AllIdeasPage = () => {
//   const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

//   if (isLoading) {
//     return <span>Loading...</span>
//   }

//   if (isError || isFetching) {
//     return <span>Error: {error?.message}</span>
//   }

//   return (
//     <div>
//       <h1>Ideanick</h1>
//       {data?.ideas.map((idea) => (
//         <div key={idea.nick}>
//           <h2>{idea.name}</h2>
//           <p>{idea.description}</p>
//         </div>
//       ))}
//     </div>
//   )
// }
