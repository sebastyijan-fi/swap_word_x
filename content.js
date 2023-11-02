function findTextNodes(element) {
    let nodes = [];
    for (let child of element.childNodes) {
      if (child.nodeType == Node.TEXT_NODE) {
        nodes.push(child);
      } else if (child.nodeType == Node.ELEMENT_NODE) {
        nodes.push(...findTextNodes(child));
      }
    }
    return nodes;
  }

  function swapWords(textNode) {
    let text = textNode.nodeValue;
    text = text.replace(/wordToReplace/gi, "replacementWord");  // Use regex for case-insensitive replacement
    textNode.nodeValue = text;
  }

  let textNodes = findTextNodes(document.body);
  textNodes.forEach(swapWords);

  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType == Node.ELEMENT_NODE) {
            let newNodes = findTextNodes(node);
            newNodes.forEach(swapWords);
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
