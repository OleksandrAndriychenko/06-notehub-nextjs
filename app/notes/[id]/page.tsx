import { fetchNoteById } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

interface Props {
    params: Promise<{ noteId: string }>
}
const Details = async ({ params }: Props) => {
    const { noteId } = await params

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['note', noteId],
        queryFn: () => fetchNoteById(noteId),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}

export default Details