async function loadMetadata() {
  const fallback = {
    repository: 'No disponible',
    branch: 'No disponible',
    runId: 'No disponible',
    publishedAt: new Date().toLocaleString('es-CL')
  };

  try {
    const response = await fetch('./report-metadata.json', { cache: 'no-store' });

    if (!response.ok) {
      renderMetadata(fallback);
      return;
    }

    const metadata = await response.json();
    renderMetadata({
      repository: metadata.repository ?? fallback.repository,
      branch: metadata.branch ?? fallback.branch,
      runId: metadata.runId ?? fallback.runId,
      publishedAt: metadata.publishedAt ?? fallback.publishedAt
    });
  } catch {
    renderMetadata(fallback);
  }
}

function renderMetadata(metadata) {
  document.getElementById('repo-name').textContent = metadata.repository;
  document.getElementById('branch-name').textContent = metadata.branch;
  document.getElementById('run-id').textContent = metadata.runId;
  document.getElementById('published-at').textContent = metadata.publishedAt;
}

loadMetadata();