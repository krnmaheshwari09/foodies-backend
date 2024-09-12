const displayData = (req, res) => {
    try {
        res.send([global.food_items, global.food_categories])
    } catch (error) {
        console.error(error)
    }
}

export{
    displayData,
}