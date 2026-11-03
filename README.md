# NVIDIA Confidential Computing Docs

Source for the NVIDIA Confidential Computing documentation site.

The documentation treats each deployment modality as a product with an independent version:

| Product | Slug | Pages |
| --- | --- | --- |
| Confidential Computing (landing) | `/` | Overview, Deployment Modalities, Guides: Attestation, Platform Compatibility Matrix |
| Confidential Bare Metal | `/bare-metal` | Overview, Deployment Guide, Reference Architecture, Playbooks, Performance |
| Confidential Virtual Machines | `/virtual-machines` | Overview, Deployment Guide, Reference Architecture, Playbooks, Performance |
| Confidential Containers | `/containers` | Overview, Deployment Guide, Reference Architecture, Playbooks, Performance |

To contribute, refer to [CONTRIBUTING.md](CONTRIBUTING.md). To report a
security issue, refer to [SECURITY.md](SECURITY.md).

## Layout

- `fern/fern.config.json`: the Fern organization (`nvidia`) and CLI version.
- `fern/docs.yml`: the site settings, the product list, and the version list for each product.
- `fern/products/<product>/current.yml`: the navigation for the current content of each product. `confidential-computing` is the unversioned landing product. Versioned deployment products serve `current.yml` as Dev.
- `fern/products/<product>/<version>.yml` and `fern/pages/<product>/<version>/`: the navigation and content for each release.
- `fern/pages/`: the MDX pages.

## Local Check

```bash
npm install -g fern-api@5.193.2
cd fern && fern check --warnings
```

CI uses the npm release specified in `fern/fern.config.json`. Update that
version and the install command above together when upgrading Fern.

## Releases

Versions are hand-managed in `fern/docs.yml`. Each release has a
version-specific navigation file and a copy of its pages and assets in the
working tree. To update a release, edit its versioned pages and merge the
change to `main`. For example, the bare-metal version entries look like this:

```yaml
    versions:
      - display-name: v1.0.0
        path: ./products/bare-metal/v1.0.0.yml
        slug: v1.0.0
      - display-name: Dev
        path: ./products/bare-metal/current.yml
        slug: dev
        availability: beta
```

To add a release, copy its pages and assets into a versioned directory, copy its
navigation file and update the page paths, and add the version to `fern/docs.yml`.
Keep release-specific shared pages in the versioned directory as well. Write
component versions directly in the pages; product-level text substitutions are
not supported by the upstream Fern CLI. Merging changes under `fern/` to `main`
publishes the site; pushing a tag alone does not publish.
