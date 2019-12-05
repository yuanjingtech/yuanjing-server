import _ from "lodash";

export function makeConnection(getArticles) {
    return async (args) => {
        let {page} = args || {};
        let {first, after, last, before} = page || {};
        const articles = await getArticles({...args, page: {...page, first: first + 1, last: last ? last + 1 : last}});
        let edges = articles.slice(0, last ? last : first).map(it => ({cursor: (it._id || it.id).toString(), node: it})) || [];
        let start = _.chain(edges).first().value();
        let end = _.chain(edges).last().value();
        return {
            pageInfo: {
                startCursor: start ? start.cursor : null,
                endCursor: end ? end.cursor : null,
                hasNextPage: !!(articles.length > (last ? last : first)),
                hasPreviousPage: !!(last ? before : after),
            },
            edges: edges
        }
    }
}