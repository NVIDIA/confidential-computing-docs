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
- `fern/products/<product>/current.yml`: the navigation for the current content of each product. `confidential-computing` is the unversioned landing product. Versioned deployment products serve `current.yml` as Dev. Released versions use either a version-specific navigation file or a Git ref.
- `fern/products/bare-metal/v1.0.0.yml` and `fern/pages/bare-metal/v1.0.0/`: the navigation and content for the bare-metal v1.0.0 release.
- `fern/pages/`: the MDX pages.

## Local Check

```bash
npm install -g fern-api@5.143.2
cd fern && fern check --warnings
```

A `ref:` entry under `products` needs the patched CLI that CI installs, until
fern-api/fern#17950 is in a Fern release.

## Releases

Versions are hand-managed in `fern/docs.yml`. Bare-metal v1.0.0 uses a
version-specific navigation file and a copy of the release pages in the working
tree. To update that release, edit its pages and merge the change to `main`.
The corresponding bare-metal version entries look like this:

```yaml
    versions:
      - display-name: v1.0.0
        path: ./products/bare-metal/v1.0.0.yml
        slug: v1.0.0
        availability: stable
      - display-name: Dev
        path: ./products/bare-metal/current.yml
        slug: dev
        availability: beta
```

Fern builds the versioned bare-metal pages from the working tree. Other products
currently use Git refs for their releases; for a ref-backed version, Fern builds
the matching product's navigation and pages from that ref. Merging changes
under `fern/` to `main` publishes the site; pushing a tag alone does not publish.
