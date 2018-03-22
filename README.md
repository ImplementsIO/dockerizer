# Dockerizer &middot;  [![GitHub license][license-image]][license-url] 

[![powered by egg][egg-square]][egg-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/ImplementsIO/dockerizer/blob/master/LICENSE
[egg-url]: https://eggjs.org/
[egg-square]: https://img.shields.io/badge/Power%20By%20Egg.js-2.5.0-ff69b4.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/ImplementsIO/dockerizer.svg?style=flat-square
[travis-url]: https://travis-ci.org/ImplementsIO/dockerizer
[codecov-image]: https://img.shields.io/codecov/c/github/ImplementsIO/dockerizer.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/ImplementsIO/dockerizer
[david-image]: https://img.shields.io/david/ImplementsIO/dockerizer.svg?style=flat-square
[david-url]: https://david-dm.org/ImplementsIO/dockerizer
[snyk-image]: https://snyk.io/test/github/ImplementsIO/dockerizer/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/github/ImplementsIO/dockerizer

---

[![CircleCI](https://circleci.com/gh/ImplementsIO/dockerizer.svg?style=svg)](https://circleci.com/gh/ImplementsIO/dockerizer)

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

#### Develop with docker
Setup redis / mongodb, requirements:

- docker
- docker-compose

```bash
# start
docker-compose -f docker-compose.dev.yml up

# stop 
docker-compose -f docker-compose.dev.yml down

# remove volume/cache
docker-compose -f docker-compose.dev.yml down -v
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
