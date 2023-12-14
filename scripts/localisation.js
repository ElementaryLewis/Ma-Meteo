function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            pos => resolve(pos),
            err => reject(err)
        );
    });
}

export default getPosition
