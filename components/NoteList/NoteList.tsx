import css from "./NoteList.module.css"
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from 'next/link';




interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const handleDelete = (id: string) => {
        mutate(id);
    };

    return (
        <ul className={css.list}>
            {notes.map((el) => (
                <li key={el.id} className={css.listItem}>
                    <h2 className={css.title}>{el.title}</h2>
                    <p className={css.content}>{el.content}</p>
                    <div className={css.footer}>
                        <Link href={`/notes/${el.id}`}>View details</Link>
                        <span className={css.tag}>{el.tag}</span>
                        <button type="button" onClick={() => handleDelete(el.id)} className={css.button}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}