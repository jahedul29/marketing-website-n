# Utility functions

You can add any utility functions you need in the `src/lib/utils` folder.

Present by default in the folder are:

## string

-   [`capitalize`](../src/lib/utils/string/capitalize.ts): Capitalizes the first character of a
    string.
-   [`removeSpaces`](../src/lib/utils/string/removeSpaces.ts): Removes spaces from a string.
-   [`removeLineBreaks`](../src/lib/utils/string/removeLineBreaks.ts): Removes line breaks from a
    string.
-   [`textToId`](../src/lib/utils/string/textToId.ts): Converts regular text to an id friendly
    string.
-   [`html`](../src/lib/utils/string/html.ts): Returns an API to manipulate an html string:
    -   `removeEmptyTags`: Removes all empty html tag from a string. To be used mostly with Redactor
        fields.
    -   `newLinesToBr`: Craft CMS outputs a newline character (`\n`) when line breaks are allowed in
        a text field. This function replaces the character with a `<br />` tag to maintain the text
        format.
    -   `stripTags`: Strips all html tags from a string. You can pass an array of tags that have to
        be preserved.
    -   `toString`: The processed html string.

## url

-   [`getEntryUrl`](../src/lib/utils/url/getEntryUrl.ts): Returns an API to get different parts of a
    url generated from a Craft entry:
    -   readonly `raw`: The raw url object.
    -   `tostring`: The `url.toString()` method.
    -   `toAbsolute`: The whole url (equivant lent to `url.toString()`).
    -   `toSchemeLess`: The path, search and hash of the url.
    -   `toLanguageRelative`: The path of the url after the language.
-   [`autoUrl`](../src/lib/utils/url/autoUrl.ts): Generates a url to a Craft entry. The entry has to
    at least have the `language` and `uri` properties in it. If a module entry is passed, it will
    generate an hash link with the module's `id` field leading to the element with the same id. You
    can use this to generate anchor buttons automatically.
-   [`getLanguageRelativeUri`](../src/lib/utils/url/getLanguageRelativeUri.ts): Returns the language
    relative uri of a Craft entry.
-   [`uriToPath`](../src/lib/utils/url/uriToPath.ts): Converts a Craft entry uri to a path.
-   [`validateSameOrigin`](../src/lib/utils/url/validateSameOrigin.ts): Validates if two urls have
    the same origin.

## form

-   [`readFile`](../src/lib/utils/form/readFile.ts): Reads a file as data url
    (https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) and returns a
    promise with the content.
-   [`fileToObject`](../src/lib/utils/form/fileToObject.ts): Converts a file object to a regular
    serializable object.
-   [`formDataToObject`](../src/lib/utils/form/formDataToObject.ts): Converts a `FormData` object to
    a regular object (also converts files to regular objects with the `fileToObject` function).
-   [`formDataToSearchParams`](../src/lib/utils/form/formDataToSearchParams.ts): Serializes a
    `FormData` object to a query string that can be appended to a url.
-   [`requestSubmit`](../src/lib/utils/form/requestSubmit.ts): Submits the form that is passed as
    the first argument (see
    <https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit>) and provides a
    fallback if `requestSubmit` is not supported.

## device

-   [`checkDocumentBounds`](../src/lib/utils/device/checkDocumentBounds.ts): Returns an object
    containing out of bound sides of a given element.
-   [`estimatedAvailableMegaBytesPerSeconds`](../src/lib/utils/device/estimatedAvailableMegaBytesPerSeconds.ts):
    Best guess at detecting the available bandwidth of the user
-   [`isTouch`](../src/lib/utils/device/isTouch.ts): Detects if the client is on a touch device.
-   [`reducedMotion`](../src/lib/utils/device/reducedMotion.ts): Detects if the user prefers reduced
    motions.

## http

-   [`cacheHeaders`](../src/lib/utils/http/cacheHeaders.ts): Several functions returning cache
    headers (used in the `cacheHeaders` handle).
-   [`copyRequest`](../src/lib/utils/http/copyRequest.ts): Copies a fetch Request object.
-   [`getLangFromRequest`](../src/lib/utils/http/getLangFromRequest.ts): Parses the request and
    returns the language.
-   [`isRedirectResponse`](../src/lib/utils/http/isRedirectResponse.ts): Detects if a fetch Response
    object is a redirect.
-   [`parseAcceptLanguage`](../src/lib/utils/http/parseAcceptLanguage.ts): Parses the value from the
    `Accept-Language` http header.
-   [`vercelHeaders`](../src/lib/utils/http/vercelHeaders.ts): Returns a objects with the vercel
    provided headers.

## timeout

-   [`debounce`](../src/lib/utils/timeout/debounce.ts): Debounces a callback.
-   [`throttle`](../src/lib/utils/timeout/throttle.ts): Throttles a callback.
-   [`sleep`](../src/lib/utils/timeout/sleep.ts): Returns a promise that resolves after a given
    duration.

## ui

-   [`getEmbedParamString`](../src/lib/utils/ui/getEmbedParamString.ts): Takes an embed (Youtube or
    Vimeo) options object and converts it to a query string.
-   [`pxToRem`](../src/lib/utils/ui/pxToRem.ts): Converts a pixel value to rems (when 1rem = 10px).
-   [`humanSize`](../src/lib/utils/ui/humanSize.ts): Makes it easy to format and display sizes in
    bytes in a human friendly way. It provides a chain-able api for the limit and precision options.
    -   `limit`: The unit to use as the final output.
    -   `precision`: The number of decimals allowed in the final value.
    -   `toString`: Returns the processed value.
-   [`formatDate`](../src/lib/utils/ui/intl/formatDate.ts): Wrapper around `Intl.DateTimeFormat`
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
    that returns the formatted date string.
-   [`formatPrice`](../src/lib/utils/ui/intl/formatPrice.ts): Wrapper around `Intl.NumberFormat`
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
    that returns the formatted price string.
