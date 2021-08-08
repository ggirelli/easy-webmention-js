function ew_append_mention_element(index, item, target) {
    card_body = $("<div />")
        .attr("id", "ew-webmention-" + index)
        .attr("title", Date(Date.parse(item.published)))
        .addClass("row card-body");

    if ( item.author.name == "" ) {
        item.author.name = "Anonymous";
        item.author.photo = "https://s3-us-west-2.amazonaws.com/ca3db/abs.twimg.com/0e6b2cd70aa5b35dec24ca4e1e63f8963f0118736d9ec3bba77e3a8c99a27bc2.png";
    }
    author_avatar = $("<img />")
            .attr("src", item.author.photo)
            .attr("alt", item.author.name + "-avatar")
            .addClass("ew-author-avatar");
    card_body.append($("<div />")
        .addClass("col-3 col-md-1 pe-0")
        .append(author_avatar));

    mention_text = "View";
    if ( item.url.startsWith("https://twitter.com/") ) {
        mention_text += " on Twitter";
    }
    if ( item.url.startsWith("https://github.com/") || item.url.startsWith("https://www.github.com/") ) {
        mention_text += " on GitHub";
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
            .text(mention_text);

    mention_content = $("<div />")
        .addClass("col-9 col-md-11 pb-2")
        .append(author_link);
    if ( item.content != null ) {
        mention_content.append($("<div />").text(item.content.text));
    } else {
        mention_content.append($("<div />").text("Content could not be retrieved.").css({"font-style":"italic"}));
    }
    mention_content.append($("<div />").append(item_link));
    card_body.append(mention_content);

    $(target)
        .append($("<div />")
            .addClass("card mb-3")
            .append($("<a />").attr("id", "ew-webmention-" + index))
            .append(card_body));
}

function ew_load_mentions() {
    $.ajaxSetup({async: false});
    $.get("https://webmention.io/api/mentions.jf2?target=" +
        EW_TARGET + "&wm-property=mention-of", {}, function(response) {
        if ( 0 != response.children.length ) {
            $.each(response.children, function(index, item) {
                ew_append_mention_element(index, item, $(EW_WRAP_ID));
            });
        }
    });
}

function ew_append_reply_element(index, item, target) {
    card_body = $("<div />")
        .attr("id", "ew-webmention-" + index)
        .attr("title", Date(Date.parse(item.published)))
        .addClass("row card-body");

    author_avatar = $("<img />")
            .attr("src", item.author.photo)
            .attr("alt", item.author.name + "-avatar")
            .addClass("ew-author-avatar");
    card_body.append($("<div />")
        .addClass("col-3 col-md-1 pe-0")
        .append(author_avatar));

    reply_text = "Reply";
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
        .append($("<div />")
            .append(item_link)));

    $(target)
        .append($("<div />")
            .addClass("card mb-3")
            .append($("<a />").attr("id", "ew-webmention-" + index))
            .append(card_body));
}

function ew_load_replies() {
    $.ajaxSetup({async: false});
    $.get("https://webmention.io/api/mentions.jf2?target=" +
        EW_TARGET + "&wm-property=in-reply-to", {}, function(response) {
        if ( 0 != response.children.length ) {
            $.each(response.children, function(index, item) {
                ew_append_reply_element(index, item, $(EW_WRAP_ID));
            });
        }
    });
}

function ew_prep_read_more_button() {
    return($("<a/>")
        .addClass("ps-2 float-end")
        .attr("id", "ew-read-more")
        .attr("target", "_new")
        .attr("href", EW_READ_MORE_URI)
        .attr("data-bs-toggle", "tooltip" )
        .attr("data-bs-placement", "top")
        .attr("title", "Read more on webmentions")
        .html("<i class='fas fa-question-circle'></i>"))
};

function ew_prep_add_webmention_button() {
    return($("<a/>")
        .addClass("ps-2 float-end")
        .attr("id", "ew-add-webmention")
        .attr("href", "#")
        .attr("data-bs-toggle", "tooltip" )
        .attr("data-bs-placement", "top")
        .attr("title", "Manually add a webmention")
        .html("<i class='fas fa-plus-circle'></i>")
        .click(function(e) {
            e.preventDefault();
            source = prompt("Manually input the address to a page referring to this article.");
            $(EW_WRAP_ID + " > form > input[name=source]").attr("value", source);
            $.post("https://webmention.io/" + EW_TAG + "/webmention",
                {"target": EW_TARGET, "source": source}, function(data, status) {
                    console.log([data, status]);
                    window.open(data.location, "_self");
                }).fail(function(data, status) {
                    console.log([data, status]);
                    if ( data.responseJSON != undefined ) {
                        alert(data.responseJSON.error_description);
                    } else {
                        alert("Error! Check the console for more details or try again later.");
                    }
                });
        }))
}

function ew_prep_webmentions_count(count) {
    webmention_count = $("<span/>").text(count + " webmentions");
    if ( EW_READ_MORE_URI == undefined ) {
        return($("<h5 />").append(webmention_count));
    } else {
        return($("<h5 />").append(webmention_count)
            .append($("<small/>")
                .append(ew_prep_read_more_button())
                .append(ew_prep_add_webmention_button())))
    }
}

function ew_init() {
    $.get("https://webmention.io/api/count?target=" + EW_TARGET, {}, function(response, status) {
        $(EW_WRAP_ID).append(ew_prep_webmentions_count(response.count));
        new bootstrap.Tooltip($("#ew-add-webmention")).enable();
        new bootstrap.Tooltip($("#ew-read-more")).enable();
        if ( 0 < response.count ) {
            plural_labels = {
                "like": "likes",
                "mention": "mentions",
                "reply": "replies",
                "bookmark": "bookmarks",
                "repost": "re-posts"
            };
            $.each(response.type, function(label, value) {
                item_header = $("<h6 />").addClass("mb-3");
                if ( value > 1 && plural_labels[label] != undefined) {
                    item_header.text(value + " " + plural_labels[label]);
                } else {
                    item_header.text(value + " " + label);
                }
                $(EW_WRAP_ID).append(item_header);
                if ( "reply" == label && response.type.reply > 0 ) {
                    ew_load_replies();
                }
                if ( "mention" == label && response.type.mention > 0 ) {
                    ew_load_mentions();
                }
            });
        }
    });
}