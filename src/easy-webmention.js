/*! easy-webmention-js - v1.0.1 - 2021-08-16
 * https://github.com/ggirelli/easy-webmention-js
 * Copyright (c) 2021
 * License: MIT
 * Author: Gabriele Girelli https://ggirelli.info
 */

function ew_append_element(index, item, target) {
    card_body = $("<div />")
        .attr("id", "ew-webmention-" + index)
        .attr("title", Date(Date.parse(item.published)))
        .addClass("row card-body");

    if ( item.author.name == "" ) { item.author.name = "Anonymous"; }
    if ( item.author.url == "" ) { item.author.url = "#" }
    if ( item.author.photo == "" ) { item.author.photo = "t.ly/a0z5"; }
    author_avatar = $("<img />")
            .attr("src", item.author.photo)
            .attr("alt", item.author.name + "-avatar")
            .addClass("ew-author-avatar");
    card_body.append($("<div />")
        .addClass("col-3 col-md-1 pe-0")
        .append(author_avatar));

    item_text = "View";
    if ( item.url.startsWith("https://twitter.com/") ) { item_text += " on Twitter"; }
    if ( item.url.startsWith("https://github.com/"
        ) || item.url.startsWith("https://www.github.com/") ) {
        item_text += " on GitHub"; }

    author_link = $("<a />")
            .addClass("ew-author-link text-decoration-none")
            .attr("href", item.author.url).attr("target", "_new")
            .text(item.author.name);
    item_link = $("<a />")
            .addClass("ew-webmention-link")
            .addClass("text-decoration-none fs-6 lh-1")
            .attr("href", item.url).attr("target", "_new")
            .text(item_text);

    item_content = $("<div />")
        .addClass("col-9 col-md-11 pb-2")
        .append(author_link);
    if ( item.content != null ) {
        item_content.append($("<div />").text(item.content.text));
    } else {
        item_content.append($("<div />").text("Content could not be retrieved."
            ).css({"font-style":"italic"}));
    }
    item_content.append($("<div />")
        .addClass("position-absolute bottom-0 end-0 p-1 pe-2")
        .append(item_link));
    card_body.append(item_content);

    $(target)
        .append($("<div />")
            .addClass("card mb-3")
            .append($("<a />").attr("id", "ew-webmention-" + index))
            .append(card_body));
}

function ew_load_property(ew_settings, m_property) {
    $.ajaxSetup({async: false});
    $.get("https://webmention.io/api/mentions.jf2?target=" +
        ew_settings.target + "&wm-property=" + m_property, {}, function(response) {
        if ( 0 != response.children.length ) {
            $.each(response.children, function(index, item) {
                ew_append_element(index, item, $(ew_settings.wrap_id));
            });
        }
    });
}

function ew_prep_read_more_button(ew_settings) {
    return($("<a/>")
        .addClass("ps-2 float-end")
        .attr("id", "ew-read-more")
        .attr("target", "_new")
        .attr("href", ew_settings.read_more_uri)
        .attr("data-bs-toggle", "tooltip" )
        .attr("data-bs-placement", "top")
        .attr("title", "Read more on webmentions")
        .html("<i class='fas fa-question-circle'></i>"))
};

function ew_prep_add_button(ew_settings) {
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
            if ( $(".ew-add-form").hasClass("d-none") ) {
                $(".ew-add-form").removeClass("d-none").slideDown();
            } else {
                $(".ew-add-form").slideUp(400, function() {
                    $(this).addClass("d-none")
                });
            }
        })
    )
}

function ew_prep_add_form(ew_settings) {
    return($("<form />")
        .attr("action", "https://webmention.io/" + ew_settings.tag + "/webmention")
        .attr("method", "post")
        .attr("target", "_new")
        .addClass("ew-add-form")
        .append($("<small />")
            .addClass("d-block mb-1 text-secondary lh-1 fs-6")
            .html("To manually add a webmention, type the address to a page containing " +
                  "a link to this article, then press enter.<br />This will open the " +
                  "webmention.io response page. Refresh the page if the status is pending."))
        .append($("<input />")
            .attr("type", "hidden")
            .attr("name", "target")
            .attr("value", ew_settings.target))
        .append($("<input />")
            .addClass("form-control")
            .attr("type", "text")
            .attr("name", "source")
            .attr("placeholder", "..."))
    )
}

function ew_prep_header_count(count) {
    return($("<p />").addClass("fs-5 header-block")
        .append($("<span/>").text(count + " webmentions")));
}

function ew_prep_header_buttons(ew_settings) {
    if ( ew_settings.read_more_uri == undefined ) {
        return($("<small/>")
                .append(ew_prep_add_button(ew_settings)));
    } else {
        return($("<small/>")
                .append(ew_prep_read_more_button(ew_settings))
                .append(ew_prep_add_button(ew_settings)))
    }
}

function ew_init(ew_settings) {
    $.get("https://webmention.io/api/count?target=" + ew_settings.target,
        {}, function(response, status) {
            ew_wrap = $(ew_settings.wrap_id);

            // HEADER
            ew_title_element = ew_prep_header_count(response.count);
            ew_title_element.append(ew_prep_header_buttons(ew_settings))
            ew_title_element.append(ew_prep_add_form(ew_settings));
            ew_wrap.append(ew_title_element);
            new bootstrap.Tooltip($("#ew-add-webmention")).enable();
            new bootstrap.Tooltip($("#ew-read-more")).enable();
            $(".ew-add-form").slideUp(0, function() {
                $(this).addClass("d-none");
            })

            // COUNTS AND ITEMS
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
                    ew_wrap.append(item_header);
                    
                    if ( "reply" == label && response.type.reply > 0 ) {
                        ew_load_property(ew_settings, "in-reply-to");
                    }
                    if ( "mention" == label && response.type.mention > 0 ) {
                        ew_load_property(ew_settings, "mention-of");
                    }
                });
            }
        }
    );
}
