const PageMode = (link) => {
    if (link.includes("view")) {
        return "VIEW_MODE"
    }
    if (link.includes("update")) {
        return "UPDATE_MODE"
    }
}

export default PageMode;