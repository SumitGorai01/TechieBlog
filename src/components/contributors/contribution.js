const getContributors = async({perPage=100, page=1}) => {
    try {
        const data = await fetch(`https://api.github.com/repos/SumitGorai01/TechieBlog/contributors?per_page=${perPage}&page=${page}`);
        return await data.json();
    } catch (error) {
        console.log(error);
        return null
    }
}

export { getContributors }