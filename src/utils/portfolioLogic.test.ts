import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjectsByCategory,
  projectMatchesFocusArea,
  calculateScrollProgress,
  interpolateCount,
} from './portfolioLogic.js';

test('filterProjectsByCategory filters correctly', () => {
  const projects = [
    { id: '1', name: 'AppendUs', categories: ['ai', 'full'] },
    { id: '2', name: 'CivicFix', categories: ['ai', 'full'] },
    { id: '3', name: 'Game Arena', categories: ['web', 'full'] },
  ];

  const all = filterProjectsByCategory(projects, 'all');
  assert.equal(all.length, 3);

  const aiProjects = filterProjectsByCategory(projects, 'ai');
  assert.equal(aiProjects.length, 2);
  assert.equal(aiProjects[0].name, 'AppendUs');

  const webProjects = filterProjectsByCategory(projects, 'web');
  assert.equal(webProjects.length, 1);
  assert.equal(webProjects[0].name, 'Game Arena');
});

test('projectMatchesFocusArea respects area mapping', () => {
  const mapping: Record<string, number[]> = {
    React: [0],
    FastAPI: [1, 3],
    PostgreSQL: [5],
    RAG: [2],
  };

  // Area 2 is AI apps
  assert.equal(projectMatchesFocusArea(['React', 'RAG'], 2, mapping), true);
  // Area 5 is Databases
  assert.equal(projectMatchesFocusArea(['React', 'FastAPI'], 5, mapping), false);
  // Area -1 is All
  assert.equal(projectMatchesFocusArea(['React'], -1, mapping), true);
});

test('calculateScrollProgress computes clamped 0-1 values', () => {
  assert.equal(calculateScrollProgress(0, 2000, 1000), 0);
  assert.equal(calculateScrollProgress(500, 2000, 1000), 0.5);
  assert.equal(calculateScrollProgress(1000, 2000, 1000), 1);
  assert.equal(calculateScrollProgress(1500, 2000, 1000), 1); // clamped
});

test('interpolateCount computes eased values correctly', () => {
  assert.equal(interpolateCount(0, 160), 0);
  assert.equal(interpolateCount(1, 160), 160);
  assert.ok(interpolateCount(0.5, 100) > 50); // Eased out is ahead of linear 50
});
