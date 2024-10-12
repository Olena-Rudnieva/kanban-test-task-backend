export const handleSaveError = (error, doc, next) => {
    if (error) {
        error.status = 400;
    }
    next();
};
