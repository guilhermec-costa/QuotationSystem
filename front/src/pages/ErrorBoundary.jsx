import { memo } from "react"

const ErrorBoundary = () => {
    return (
        <h2>Something went wrong...</h2>
    )
}

export default memo(ErrorBoundary);
