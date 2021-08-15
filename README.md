# easy-webmention-js
A simple JavaScript library to serve Webmentions via Webmention.io

This script requires jQuery v3.3.1+ and Bootstrap v5.0.2+. Please, add the following in the `<head />` of your pages, after importing Bootstrap and jQuery:
```html
<script type="text/javascript" src="https://ggirelli.github.io/easy-webmention-js/src/easy-webmention.js"></script>
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
