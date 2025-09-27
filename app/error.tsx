'use client'

interface Props {
    error: Error
}

const ErrorNotes = ({error}: Props) => {
    return (
        <p>Could not fetch the list of notes. {error.message}</p>
    )
}

export default ErrorNotes