#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

/**
 * Git Commit Summary Tool
 * Author: Sai Annam (mr_ask_chay / otaku0304)
 */

const AUTHOR_INFO = {
    "Name": "Sai Annam",
    "Handle": "mr_ask_chay / otaku0304",
    "StartMyDev": "https://start-my-dev-dashboard.vercel.app/",
    "PDF Password Remover": "https://pdf-fe-kappa.vercel.app/",
    "Angular i18n SPA": "Multilingual Single Page Application Demo"
};

// ANSI Colors
const COLORS = {
    RESET: "\x1b[0m",
    BRIGHT: "\x1b[1m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m"
};

function printBanner() {
    console.log(`\n${COLORS.BRIGHT}${COLORS.CYAN}╔══════════════════════════════════════════════════════════╗`);
    console.log(`║ ${COLORS.MAGENTA}Git Commit Summary Tool${COLORS.CYAN}                                  ║`);
    const padding = ' '.repeat(Math.max(0, 47 - AUTHOR_INFO['Name'].length - AUTHOR_INFO['Handle'].length - 3));
    console.log(`║ ${COLORS.WHITE}Author: ${AUTHOR_INFO['Name']} (${AUTHOR_INFO['Handle']})${COLORS.CYAN}${padding}║`);
    console.log(`╚══════════════════════════════════════════════════════════╝`);
    
    console.log(`${COLORS.BLUE}Other Projects by Author:${COLORS.RESET}`);
    Object.entries(AUTHOR_INFO).slice(2).forEach(([proj, desc]) => {
        console.log(`  ${COLORS.YELLOW}• ${proj}${COLORS.RESET}: ${desc}`);
    });
    console.log(`${COLORS.CYAN}──────────────────────────────────────────────────────────${COLORS.RESET}\n`);
}

function detectFunction(line) {
    // JS, TS: function name() or async function name()
    let match = line.match(/\+\s*(?:async\s+)?function\s+([a-zA-Z_]\w*)/);
    if (match) return match[1];

    // Python: def name
    match = line.match(/\+\s*def\s+([a-zA-Z_]\w*)/);
    if (match) return match[1];

    // Class methods / C-like: public/private type name()
    match = line.match(/\+\s*(?:public|private|protected|static|\w+)\s+[\w<>]+\s+([a-zA-Z_]\w*)\s*\(/);
    if (match) return match[1];

    return null;
}

function main() {
    if (process.stdin.isTTY) {
        console.log(`${COLORS.RED}❌ Error: Please pipe a git diff or commit.${COLORS.RESET}`);
        console.log(`${COLORS.YELLOW}Usage: git show HEAD | git-commit-summary${COLORS.RESET}`);
        process.exit(1);
    }

    printBanner();

    const stats = {
        files: new Set(),
        added: 0,
        removed: 0,
        functionsAdded: [],
        fileTypes: {}
    };

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        line = line.trimEnd();

        if (line.startsWith("diff --git")) {
            const parts = line.split(" ");
            if (parts.length >= 3) {
                const fpath = parts[2].replace(/^a\//, "");
                stats.files.add(fpath);
                
                const ext = fpath.includes('.') ? fpath.split('.').pop() : 'no-ext';
                stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1;
            }
        }

        if (line.startsWith("+") && !line.startsWith("+++")) {
            stats.added++;
            const funcName = detectFunction(line);
            if (funcName) {
                stats.functionsAdded.push(funcName);
            }
        }

        if (line.startsWith("-") && !line.startsWith("---")) {
            stats.removed++;
        }
    });

    rl.on('close', () => {
        const netChange = stats.added - stats.removed;
        const netColor = netChange >= 0 ? COLORS.GREEN : COLORS.RED;
        const sign = netChange >= 0 ? '+' : '';

        console.log(`${COLORS.BRIGHT}📊 Statistics:${COLORS.RESET}`);
        console.log(`  ${COLORS.GREEN}Files Changed :${COLORS.RESET} ${stats.files.size}`);
        console.log(`  ${COLORS.GREEN}Lines Added   :${COLORS.RESET} ${stats.added}`);
        console.log(`  ${COLORS.RED}Lines Removed :${COLORS.RESET} ${stats.removed}`);
        console.log(`  ${COLORS.WHITE}Net Change    :${COLORS.RESET} ${netColor}${sign}${netChange}${COLORS.RESET}`);

        console.log(`\n${COLORS.BRIGHT}📁 File Types:${COLORS.RESET}`);
        Object.entries(stats.fileTypes).forEach(([ext, count]) => {
            console.log(`  ${COLORS.YELLOW}.${ext.padEnd(10)}${COLORS.RESET}: ${count}`);
        });

        if (stats.functionsAdded.length > 0) {
            console.log(`\n${COLORS.BRIGHT}✨ New Functions (${stats.functionsAdded.length}):${COLORS.RESET}`);
            stats.functionsAdded.slice(0, 15).forEach(fn => {
                console.log(`  ${COLORS.CYAN}+ ${fn}${COLORS.RESET}`);
            });
            if (stats.functionsAdded.length > 15) {
                console.log(`  ${COLORS.WHITE}... and ${stats.functionsAdded.length - 15} more${COLORS.RESET}`);
            }
        } else {
            console.log(`\n${COLORS.BRIGHT}✨ New Functions:${COLORS.RESET} None detected`);
        }

        console.log(`\n${COLORS.WHITE}Status: ${COLORS.GREEN}Success${COLORS.RESET}`);
    });
}

main();
