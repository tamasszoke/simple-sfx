import { expect } from 'chai';
import ReactSfx from '../src/index.js';

describe('ReactSfx Component', () => {

  window.HTMLMediaElement.prototype.load = () => { /* Do nothing */ };
  window.HTMLMediaElement.prototype.play = () => { /* Do nothing */ };
  window.HTMLMediaElement.prototype.pause = () => { /* Do nothing */ };

  it('should load audio component', () => {
    let audio = null;
    expect(() => { audio = new ReactSfx(); }).to.throw(Error) &&
    expect(() => { audio = new ReactSfx(['/example/public/click.mp3']); }).to.not.throw(Error) &&
    expect(() => { audio = new ReactSfx(['/example/public/click.mp3'], false); }).to.not.throw(Error) &&
    expect(() => { audio = new ReactSfx(['/example/public/click.mp3'], true); }).to.not.throw(Error) &&
    expect(audio).to.be.an('object') &&
    expect(audio).to.have.property('play') &&
    expect(audio).to.have.property('stop') &&
    expect(audio).to.have.property('on') &&
    expect(audio).to.have.property('off');
  })

  it('should play audio, string parameter', () => {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.play(); }).to.throw(Error) &&
    expect(() => { audio.play('notFound'); }).to.throw(Error) &&
    expect(() => { audio.play('click'); }).to.not.throw(Error) &&
    expect(audio.play('click')).to.equal(1);
  })

  it('should play audio, object parameter', () => {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.play([]); }).to.throw(Error) &&
    expect(() => { audio.play({}); }).to.throw(Error) &&
    expect(() => { audio.play({ name: 'notFound', volume: .5, loop: true }); }).to.throw(Error) &&
    expect(() => { audio.play({ name: 'click', volume: .5, loop: true }); }).to.not.throw(Error) &&
    expect(audio.play({ name: 'click', volume: .5, loop: true })).to.equal(2);
  })
  
  it('should stop audio, string parameter', () => {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.stop('notFound'); }).to.throw(Error) &&
    expect(() => { audio.stop('click'); }).to.not.throw(Error) &&
    expect(audio.stop('click')).to.equal(1);
  })
  
  it('should stop audio, array parameter', () => {
    let audio = new ReactSfx([
      '/example/public/click.mp3',
      '/example/public/clack.mp3'
    ], false);
    expect(() => { audio.stop([]); }).to.throw(Error) &&
    expect(() => { audio.stop(['notFound']); }).to.throw(Error) &&
    expect(() => { audio.stop(['click']); }).to.not.throw(Error) &&
    expect(() => { audio.stop(['click', 'clack']); }).to.not.throw(Error) &&
    expect(audio.stop(['click'])).to.equal(1);
  })

  it('should stop all audio', () => {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.stop(); }).to.not.throw(Error) &&
    expect(audio.stop()).to.equal(2);
  })

  it('should switch on audio', () => {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.on(); }).to.not.throw(Error) &&
    expect(audio.on()).to.equal(1);
  })

  it('should switch off audio', () => {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.off(); }).to.not.throw(Error) &&
    expect(audio.off()).to.equal(1);
  })
})