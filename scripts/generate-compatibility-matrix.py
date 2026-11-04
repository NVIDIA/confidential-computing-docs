#!/usr/bin/env python3
"""Validate the authoritative CSV files and generate the matrix widget data."""
import argparse
import csv
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'fern/data/compatibility'
TEMPLATE = ROOT / 'scripts/compatibility-matrix.template.js'
OUTPUT = ROOT / 'fern/scripts/compatibility-matrix.js'
FIELDS = ['Description', 'VBIOS', 'CUDA Driver', 'Confidential Computing Mode',
          'Form Factor', 'RIM Status', 'VBIOS_RIM', 'SKU']


def generate():
    files = sorted(DATA.glob('*.csv'))
    if not files:
        raise ValueError(f'No CSV files found in {DATA}')
    rows = []
    seen = set()
    for path in files:
        with path.open(encoding='utf-8', newline='') as file:
            reader = csv.DictReader(file)
            if reader.fieldnames != FIELDS:
                raise ValueError(f'{path}: expected headers {FIELDS}')
            for line, row in enumerate(reader, 2):
                if None in row or any(value is None or not value.strip() for value in row.values()):
                    raise ValueError(f'{path}:{line}: missing or extra values')
                key = tuple(row[field] for field in FIELDS)
                if key in seen:
                    raise ValueError(f'{path}:{line}: duplicate row')
                seen.add(key)
                rows.append([row[field] for field in FIELDS])
    if not rows:
        raise ValueError('No matrix rows found')
    return TEMPLATE.read_text(encoding='utf-8').replace(
        '/* MATRIX_DATA */', json.dumps(rows, ensure_ascii=True, separators=(',', ':')))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='check that the generated widget is current')
    args = parser.parse_args()
    try:
        content = generate()
        if args.check:
            if not OUTPUT.exists() or OUTPUT.read_text(encoding='utf-8') != content:
                print(f'{OUTPUT} is out of date; run python3 scripts/generate-compatibility-matrix.py', file=sys.stderr)
                return 1
        else:
            OUTPUT.write_text(content, encoding='utf-8')
            print(f'Validated CSV data and generated {OUTPUT.relative_to(ROOT)}')
    except (ValueError, csv.Error, OSError) as exc:
        print(exc, file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
