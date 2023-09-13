/**
 * 【kebab-case】命名规则校验
 */
const { execSync } = require('child_process');
try {
  // 校验的文件后缀
  const fileSuffix = '*.js *.vue *.ts *.tsx';
  // 获取暂定的文件列表
  const stagedFile = execSync('git diff --cached --name-only --diff-filter=ACMR -- ' + fileSuffix, {
    encoding: 'utf-8',
  });
  if (stagedFile) {
    const files = stagedFile.split('\n');
    const regx = /(?=.*[A-Z])/; //匹配大写字母
    const failedFiles = [];
    files.forEach((file) => {
      if (file.match(regx)) {
        failedFiles.push(file);
      }
    });
    if (failedFiles.length) {
      console.error(
        '----------------------------------【kebab-case】命名规则校验------------------------------------',
        '\n\n',
        `项目采用【kebab-case】命名规则，文件（${fileSuffix}）或文件夹校验失败：\n ${failedFiles.join(
          '\n',
        )}`,
        '\n\n\n\n',
      );
      process.exit(1);
    }
  }
  process.exit(0);
} catch (e) {
  console.log(e);
  process.exit(1);
}

/* 
在 package.json 中配置如下，可以在代码提交前，进行校验处理
"husky": {
  "hooks": {
    "pre-commit": "node build/hooks-git/pre-commit.js"
  }
}
*/

// git symbolic-ref --short -q HEAD  获得git分支
