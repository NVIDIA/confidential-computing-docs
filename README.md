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
- `fern/products/<product>/current.yml`: the navigation for the current content of each product. `confidential-computing` is the landing product. `main` serves `current.yml` as the Dev version, and a tagged version serves the `current.yml` from the tag.
- `fern/pages/`: the MDX pages.

## Local Check

```bash
npm install -g fern-api@5.143.2
cd fern && fern check --warnings
```

A `ref:` entry under `products` needs the patched CLI that CI installs, until
fern-api/fern#17950 is in a Fern release.

## Releases

Versions are hand-managed in `fern/docs.yml`. To release one product, tag
`main`, for example `bare-metal-v1.0.0`, and add a version entry that points
at the tag to that product only:

```yaml
    versions:
      - display-name: v1.0.0
        ref: bare-metal-v1.0.0
        slug: v1.0.0
        availability: stable
      - display-name: Dev
        path: ./products/bare-metal/current.yml
        slug: dev
        availability: beta
```

Fern builds the tagged checkout for that version, so the release shows the
`current.yml` and pages from the tag. The other products are unaffected.
Merging the version entry to `main` publishes the site. Pushing a tag alone
does not publish.
