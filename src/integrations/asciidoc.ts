import type { AstroIntegration } from 'astro';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Asciidoctor from 'asciidoctor';

const asciidoctor = Asciidoctor();

function findAdocFiles(dir: string, files: string[] = []): string[] {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            findAdocFiles(fullPath, files);
        } else if (entry.name.endsWith('.adoc')) {
            files.push(fullPath);
        }
    }

    return files;
}

export default function asciidocIntegration(): AstroIntegration {
    return {
        name: 'asciidoc-integration',
        hooks: {
            'astro:build:setup': async () => {
                console.log('[asciidoc] Converting .adoc files to HTML...');

                // Find all .adoc files in src/pages
                const adocFiles = findAdocFiles('src/pages');

                for (const adocFile of adocFiles) {
                    try {
                        // Read the AsciiDoc file
                        const content = readFileSync(adocFile, 'utf-8');

                        // Extract layout from frontmatter
                        const layoutMatch = content.match(/:layout:\s*(.+)/);
                        const layout = layoutMatch ? layoutMatch[1].trim() : '';

                        // Convert AsciiDoc to HTML using asciidoctor
                        const doc = asciidoctor.load(content, {
                            safe: 'safe',
                            attributes: {
                                'allow-uri-read': true
                            }
                        });

                        const html = doc.convert();

                        // Create the markdown file with frontmatter
                        // Remove leading underscore from filename if present (_about.adoc -> about.md)
                        let mdFile = adocFile.replace(/\.adoc$/, '.md');
                        mdFile = mdFile.replace(/\/_([^/]+)$/, '/$1');

                        const mdContent = `---
layout: ${layout}
---

${html}`;

                        writeFileSync(mdFile, mdContent, 'utf-8');
                        console.log(`[asciidoc] ✓ ${adocFile} → ${mdFile}`);
                    } catch (error) {
                        console.error(`[asciidoc] Error converting ${adocFile}:`, error);
                    }
                }

                console.log('[asciidoc] Conversion complete');
            }
        }
    };
}
