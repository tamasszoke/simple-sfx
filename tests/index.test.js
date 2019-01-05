import { expect } from 'chai';
import ReactSfx from '../src/index.js';

describe('ReactSfx Component', () => {

  window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };

  it('should load audio component', function() {
    let audio;
    expect(() => { audio = new ReactSfx(); }).to.throw(Error) &&
    expect(() => { audio = new ReactSfx(['/example/public/click.mp3'], false); }).to.not.throw(Error) &&
    expect(audio).to.be.an('object');
  })

  it('should play audio, string parameter', function() {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.play(); }).to.throw(Error) &&
    expect(() => { audio.play('notFound'); }).to.throw(Error) &&
    expect(() => { audio.play('click'); }).to.not.throw(Error);
  })

  it('should play audio, object parameter', function() {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.play([]); }).to.throw(Error) &&
    expect(() => { audio.play({}); }).to.throw(Error) &&
    expect(() => { audio.play({ name: 'notFound', volume: .5, loop: true }); }).to.throw(Error);
    expect(() => { audio.play({ name: 'click', volume: .5, loop: true }); }).to.not.throw(Error);
  })
  
  it('should stop audio, string parameter', function() {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.stop('notFound'); }).to.throw(Error) &&
    expect(() => { audio.stop('click'); }).to.not.throw(Error);
  })
  
  it('should stop audio, array parameter', function() {
    let audio = new ReactSfx([
      '/example/public/click.mp3',
      '/example/public/clack.mp3'
    ], false);
    expect(() => { audio.stop([]); }).to.throw(Error) &&
    expect(() => { audio.stop(['notFound']); }).to.throw(Error) &&
    expect(() => { audio.stop(['click']); }).to.not.throw(Error) &&
    expect(() => { audio.stop(['click', 'clack']); }).to.not.throw(Error);
  })

  it('should stop all audio', function() {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.stop(); }).to.not.throw(Error);
  })

  it('should switch on audio', function() {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.on(); }).to.not.throw(Error);
  })

  it('should switch off audio', function() {
    let audio = new ReactSfx([
      '/example/public/click.mp3'
    ], false);
    expect(() => { audio.off(); }).to.not.throw(Error);
  })
})