const fs = require('fs/promises');
const path = require('path');

const projectDestFolder = path.join(__dirname, 'project-dist');

const templateFile = path.join(__dirname, 'template.html');
const destIndexHtml = path.join(projectDestFolder, 'index.html');
const componentsFolder = path.join(__dirname, 'components');

const destCSSFile = path.join(projectDestFolder, 'style.css');
const srcCSSFolder = path.join(__dirname, 'styles');

const srcAssets = path.join(__dirname, 'assets');
const destAssets = path.join(projectDestFolder, 'assets');


async function buildHTML(templateFile, componentsFolder, destIndexHtml) {

    let template = await fs.readFile(templateFile, 'utf-8');
    const componentsFiles = await fs.readdir(componentsFolder, { withFileTypes: true });

    for (const file of componentsFiles) {
        if (file.isFile() && path.extname(file.name) === '.html') {
            const filePath = path.join(componentsFolder, file.name);
            const fileData = await fs.readFile(filePath, 'utf-8');
            const extName = path.extname(file.name);
            const baseName = path.basename(file.name, extName);
            const reg = RegExp(`{{${baseName}}}`, 'gi');

            template = template.replace(reg, fileData);
        }
    }

    await fs.writeFile(destIndexHtml, template);
}

async function buildCSS(srcCSSFolder, destBundleFile) {
    let result = [];
    const srcFiles = await fs.readdir(srcCSSFolder, {withFileTypes: true});

    for (const srcFile of srcFiles) {
        if (srcFile.isFile() && path.extname(srcFile.name) === '.css') {
            result.push(await fs.readFile(path.join(srcCSSFolder, srcFile.name), 'utf-8'));
        }
    }

    await fs.writeFile(destBundleFile, result.join('\n'));
}

async function copyDirectory(srcFolder, destFolder) {
    await fs.mkdir(destFolder, { recursive: true });
    const srcFiles = await fs.readdir(srcFolder, { withFileTypes: true });
    const destFiles = await fs.readdir(destFolder, { withFileTypes: true });

    for (const file of destFiles) {
        try {
            await fs.rm(path.join(destFolder, file.name), { recursive: true });
        } catch (err) {
            // console.log(err);
        } finally {
            continue;
        }
    }

    for (const file of srcFiles) {
        if (file.isDirectory()) {
            await copyDirectory(path.join(srcFolder, file.name), path.join(destFolder, file.name));
        } else if (file.isFile()) {
            await fs.copyFile(path.join(srcFolder, file.name), path.join(destFolder, file.name));
        }
    }
}

async function buildPage() {
    await fs.mkdir(projectDestFolder, { recursive: true });
    await buildHTML(templateFile, componentsFolder, destIndexHtml);
    await buildCSS(srcCSSFolder, destCSSFile);
    await copyDirectory(srcAssets, destAssets);
}

buildPage();