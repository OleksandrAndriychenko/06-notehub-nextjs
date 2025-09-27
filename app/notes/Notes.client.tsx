'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api';
import { useDebounce } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css'
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function Notes() {
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);

    const [debouncedSearchValue] = useDebounce(searchValue, 300);

    const updateSearchQuery = ((value: string) => {
            setSearchValue(value);
            setPage(1);
        }
    );

    const handleCreateNote = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const { data } = useQuery({
        queryKey: ['notes', debouncedSearchValue, page],
        queryFn: () => fetchNotes(debouncedSearchValue, page),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		        {<SearchBox onChange={updateSearchQuery}/>}
                {(data && data?.totalPages > 1) && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
		        {<button className={css.button} onClick={handleCreateNote}>Create note +</button>}
            </header>
            {(data && data?.notes.length >= 1) && <NoteList notes={data?.notes} />}
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <NoteForm onClose={handleCloseModal} />
                </Modal>
            )}
        </div>
    );
}
