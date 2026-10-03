<!--
  SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
  SPDX-License-Identifier: Apache-2.0
-->
# Contributing to the NVIDIA Confidential Computing Docs

Thanks for contributing to the NVIDIA Confidential Computing documentation.
The documentation is licensed under [Apache 2.0](LICENSE). Before a pull
request is merged, the pull request must follow these guidelines:

* Follow the documentation style guidelines.
* Sign your work.

## Documentation Style Guidelines

The documentation is written in [MDX](https://mdxjs.com/) and built with
[Fern](https://buildwithfern.com). Pages are in `fern/pages/`, and each
product's navigation is in `fern/products/<product>/current.yml`.

### Filenames

Use only lowercase alphanumeric characters and hyphens `-`. Filenames use the
`.mdx` extension.

### Headings

Use title case for headings. Fern renders the frontmatter `title` as the page
heading, so do not add an H1 to the page body.

### Links

Link to other pages with relative paths, such as `./threat-model`, so that the
links work in every version of the site.

### Writing Style

* Describe the current release only. Release notes are the exception.
* Repeat the noun, such as "the verifier" or "this field", instead of using
  a pronoun such as "it".
* Use active voice, and address the reader as "you".
* Use "must" for requirements.
* Keep one idea per sentence, and aim for fewer than 30 words.

### Check Your Changes

Install the Fern CLI and check the site before you open a pull request:

```console
$ cd fern
$ fern check --warnings
```

## Pull Request Previews

Each pull request gets a preview of the site. A maintainer approves each
commit for a preview by commenting `/ok to test <SHA>` on the pull request,
and copy-pr-bot then runs the preview build. A new commit needs a new
approval. The preview workflow comments the preview URL on the pull request.

## Sign your work

The sign-off is a simple line at the end of the explanation for the patch. Your
signature certifies that you wrote the patch or otherwise have the right to pass
it on as an open-source patch. The rules are pretty simple: if you can certify
the below (from [developercertificate.org](http://developercertificate.org/)):

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
1 Letterman Drive
Suite D4700
San Francisco, CA, 94129

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

Then you just add a line to every git commit message:

    Signed-off-by: Joe Smith <joe.smith@email.com>

Use your real name (sorry, no pseudonyms or anonymous contributions.)

If you set your `user.name` and `user.email` git configs, you can sign your
commit automatically with `git commit -s`.
