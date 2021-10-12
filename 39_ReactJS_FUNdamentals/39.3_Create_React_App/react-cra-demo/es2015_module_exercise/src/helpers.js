
function choice(items) {
    return items[Math.floor(Math.random() * items.length)]
}

function remove(items, item) {
    let checkFor = items.indexOf(item)
    if (checkFor !== -1) {
        return items.splice(checkFor, 1)
    }
}

export { choice, remove }