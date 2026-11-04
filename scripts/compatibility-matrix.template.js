// Generated into fern/scripts/compatibility-matrix.js from the CSV files.
(() => {
  const rows = /* MATRIX_DATA */;
  const columns = ['GPU', 'VBIOS', 'CUDA Driver', 'Confidential Computing Mode', 'Form Factor', 'RIM Status', 'VBIOS RIM', 'SKU'];
  const filters = [0, 1, 2, 3, 4];
  const pageSize = 100;

  function compareDriversDescending(a, b) {
    const left = a.split('.').map(Number);
    const right = b.split('.').map(Number);
    if ([...left, ...right].some(Number.isNaN)) {
      return b.localeCompare(a, undefined, {numeric: true});
    }
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const difference = (right[i] || 0) - (left[i] || 0);
      if (difference) return difference;
    }
    return 0;
  }

  rows.sort((a, b) => compareDriversDescending(a[2], b[2]));

  function initialize(root) {
    if (root.dataset.matrixReady) return;
    root.dataset.matrixReady = 'true';
    root.textContent = '';
    const form = document.createElement('form');
    const controls = document.createElement('div');
    controls.className = 'compatibility-filters';
    const selects = filters.map(index => {
      const label = document.createElement('label');
      label.textContent = columns[index];
      const select = document.createElement('select');
      label.appendChild(select);
      controls.appendChild(label);
      return select;
    });
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'compatibility-submit';
    submit.textContent = 'Submit';
    form.append(controls, submit);
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    const submitLabel = document.createElement('strong');
    submitLabel.textContent = 'Submit';
    status.append('Select filters, then click ', submitLabel, ' to see results.');
    const wrapper = document.createElement('div');
    wrapper.className = 'compatibility-table-wrapper';
    wrapper.hidden = true;
    wrapper.tabIndex = 0;
    wrapper.setAttribute('aria-label', 'Compatibility matrix results');
    const table = document.createElement('table');
    const head = table.createTHead().insertRow();
    columns.forEach(title => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = title;
      head.appendChild(th);
    });
    const body = table.createTBody();
    wrapper.appendChild(table);
    const navigation = document.createElement('div');
    navigation.className = 'compatibility-navigation';
    navigation.hidden = true;
    const previous = document.createElement('button');
    const next = document.createElement('button');
    previous.textContent = 'Previous';
    next.textContent = 'Next';
    navigation.append(previous, next);
    root.append(form, status, wrapper, navigation);
    let page = 0;
    let applied = filters.map(() => '');

    function updateOptions() {
      const selected = selects.map(select => select.value);
      selects.forEach((select, filterIndex) => {
        const values = new Set(rows.filter(row => filters.every((column, i) =>
          i === filterIndex || !selected[i] || row[column] === selected[i]
        )).map(row => row[filters[filterIndex]]));
        select.replaceChildren(new Option('All', ''));
        const compare = filters[filterIndex] === 2
          ? compareDriversDescending
          : (a, b) => a.localeCompare(b, undefined, {numeric: true});
        [...values].sort(compare).forEach(value => select.add(new Option(value, value)));
        select.value = selected[filterIndex];
      });
    }
    function render() {
      const matches = rows.filter(row => filters.every((column, i) => !applied[i] || row[column] === applied[i]));
      const pages = Math.max(1, Math.ceil(matches.length / pageSize));
      page = Math.min(page, pages - 1);
      body.replaceChildren();
      matches.slice(page * pageSize, (page + 1) * pageSize).forEach(row => {
        const tr = body.insertRow();
        row.forEach(value => { tr.insertCell().textContent = value; });
      });
      status.textContent = matches.length ? `${matches.length} results. Page ${page + 1} of ${pages}.` : 'No matching results.';
      previous.disabled = page === 0;
      next.disabled = page >= pages - 1;
    }
    selects.forEach(select => select.addEventListener('change', updateOptions));
    form.addEventListener('submit', event => {
      event.preventDefault();
      applied = selects.map(select => select.value);
      page = 0;
      wrapper.hidden = false;
      navigation.hidden = false;
      render();
    });
    previous.addEventListener('click', () => { page--; render(); });
    next.addEventListener('click', () => { page++; render(); });
    updateOptions();
  }
  function findMatrix() {
    const root = document.getElementById('compatibility-matrix');
    if (root) initialize(root);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', findMatrix);
  else findMatrix();
  new MutationObserver(findMatrix).observe(document.documentElement, {childList: true, subtree: true});
})();
