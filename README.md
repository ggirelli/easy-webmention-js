# easy-webmention-js

![](https://img.shields.io/github/release/ggirelli/easy-webmention-js.svg?style=flat) ![](https://img.shields.io/github/release-date/ggirelli/easy-webmention-js.svg?style=flat) ![](https://img.shields.io/github/languages/code-size/ggirelli/easy-webmention-js.svg?style=flat)  
![](https://img.shields.io/github/license/ggirelli/easy-webmention-js.svg?style=flat) ![](https://img.shields.io/github/watchers/ggirelli/easy-webmention-js.svg?label=Watch&style=social) ![](https://img.shields.io/github/stars/ggirelli/easy-webmention-js.svg?style=social)

A simple JavaScript library to serve [Webmentions](https://www.w3.org/TR/webmention/) via [Webmention.io](https://Webmention.io)

**\[ [Live Demo](https://ggirelli.info/blog/2021/08/08/webmentions#webmentions-wrap) ]**

## Requirements

This script requires [jQuery](https://jquery.com/) v3.3.1+ and [Bootstrap](https://getbootstrap.com/) v5.0.2+.

## Usage

Please, add the following in the `<head />` of your pages, after importing Bootstrap and jQuery:
```html
<script type="text/javascript" src="https://ggirelli.github.io/easy-webmention-js/src/easy-webmention.min.js"></script>
```

Then, place the following where you would like your webmentions to appear:

```html
<!-- WEBMENTIONS -->
<div id="webmentions-wrap" class="border-top pt-2"></div>
<script type="text/javascript">
    $(function () {
        ew_init({
                      "tag" : "{{ site.webmentions.tag }}",       // Webmention.io username
                   "target" : "{{ site.url }}{{ page.url }}",     // This page's URL
            "read_more_uri" : "{{ site.webmentions.help_page }}", // URL to help page (optional)
                  "wrap_id" : "#webmentions-wrap"                 // ID of element where to add webmentions
        });
    });
</script>

```

