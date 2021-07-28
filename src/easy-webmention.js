function append_reply_element(index, item, target) {
    card_body = $("<div />")
        .attr("id", "ew-webmention-" + index)
        .attr("title", item.published)
        .addClass("row card-body");

    author_avatar = $("<img />")
            .attr("src", item.author.photo)
            .attr("alt", item.author.name + "-avatar")
            .addClass("ew-author-avatar");
    card_body.append($("<div />")
        .addClass("col-3 col-md-1 pe-0")
        .append(author_avatar));

    reply_text = "reply";
    if ( item.url.startsWith("https://twitter.com/") ) {
        reply_text += " on Twitter";
    }
    if ( item.url.startsWith("https://github.com/") ) {
        reply_text += " on GitHub";
    }

    author_link = $("<a />")
            .attr("href", item.author.url)
            .attr("target", "_new")
            .addClass("ew-author-link text-decoration-none")
            .text(item.author.name);
    item_link = $("<a />")
            .addClass("ew-webmention-link text-decoration-none")
            .attr("href", item.url)
            .attr("target", "_new")
            .text(reply_text);
    card_body.append($("<div />")
        .addClass("col-9 col-md-11 pb-2")
        .append(author_link)
        .append($("<div />").text(item.content.text))
        .append(item_link));

    $(target)
        .append($("<div />")
            .addClass("card mb-3")
            .append($("<a />").attr("id", "ew-webmention-" + index))
            .append(card_body));
}

function process_inreply_query_response(response) {
    $.each(response.children, function(index, item) {
        append_reply_element(index, item, WEBMENTIONS_ID);
    });

    if ( 0 == response.children.length ) {
        $(WEBMENTIONS_ID)
            .addClass("card card-body")
            .text("No webmentions found for this page.");
    }
}
