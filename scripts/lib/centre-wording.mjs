export function brandMentions(text) {
  return text.match(/\bNew Dubai Nursery\b/gi) || [];
}

export function hasGenericNursery(text) {
  return /\bnursery\b/i.test(text.replace(/\bNew Dubai Nursery\b/gi, ''));
}

export function centreWording(text) {
  const updated = text.replace(/\bNew Dubai Nursery\b|\bnursery\b/gi, word => {
    if (/^New Dubai /i.test(word)) return word;
    if (word === word.toUpperCase()) return 'EARLY CHILDHOOD CENTRE';
    return /^[A-Z]/.test(word) ? 'Early Childhood Centre' : 'early childhood centre';
  });
  return updated
    .replace(/\bOur current early childhood centre information welcomes\b/g, 'Our early childhood centre welcomes')
    .replace(/\bA Early Childhood Centre\b/g, 'An Early Childhood Centre')
    .replace(/\ba early childhood centre\b/g, 'an early childhood centre')
    .replace(/\bStarting early childhood centre\b/g, 'Starting at an early childhood centre')
    .replace(/\bexploring early childhood centre\b/g, 'exploring an early childhood centre')
    .replace(/\battending early childhood centre\b/g, 'attending the early childhood centre')
    .replace(/\bstarted early childhood centre\b/g, 'started at the early childhood centre')
    .replace(/\bat early childhood centre\b/g, 'at the early childhood centre')
    .replace(/\bEarly Childhood Centre life\b/g, 'Early Childhood Centre Life');
}
