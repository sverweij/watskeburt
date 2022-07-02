function formatMetric(pCoverageMetric) {
  return `${pCoverageMetric.pct}%|${pCoverageMetric.covered}/${pCoverageMetric.total}|${pCoverageMetric.skipped} skipped`;
}

function formatSummary(pCoverageSummary) {
  return (
    `|||||\n` +
    `|:--|--:|:--:|--:|\n` +
    `|**Statements**|${formatMetric(pCoverageSummary.total.statements)}|\n` +
    `|**Branches**|${formatMetric(pCoverageSummary.total.branches)}|\n` +
    `|**Functions**|${formatMetric(pCoverageSummary.total.functions)}|\n` +
    `|**Lines**|${formatMetric(pCoverageSummary.total.lines)}|\n`
  );
}
/**
 *
 * @param {readStream} pStream stream whose characters are to be slapped between header and footer
 * @param {writeStream} pOutStream stream to write to
 */
function wrap(pInStream, pOutStream) {
  let lBuffer = "";

  pInStream
    .on("end", () => {
      pOutStream.write(formatSummary(JSON.parse(lBuffer)));
      pOutStream.end();
    })
    .on(
      "error",
      /* c8 ignore start */
      (pError) => {
        process.stderr.write(`${pError}\n`);
      }
      /* c8 ignore stop */
    )
    .on("data", (pChunk) => {
      lBuffer += pChunk;
    });
}

wrap(process.stdin, process.stdout);
