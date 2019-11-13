import { shallowMount, mount } from '@vue/test-utils'
import GameComponent from '@/components/GameComponent'

describe('GameComponent', () => {
  let wrapper;
  let introScreen;
  let match;
  let domObject;

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(GameComponent);

    domObject = {
      classList: {
        add: jest.fn()
      }
    };
    introScreen = jest.spyOn(document, 'querySelector').mockReturnValueOnce(domObject);
    match = jest.spyOn(document, 'querySelector').mockReturnValueOnce(domObject);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })
  it('renders correctly', () => {
    const wrapper = shallowMount(GameComponent)
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot()
  });

  it('screen fades in into main screen', () => {
    wrapper.find({ref: 'pvComp'}).trigger('click');
    expect(introScreen).toHaveBeenCalledWith(".intro");
    expect(match).toHaveBeenCalledWith(".match");
    expect(domObject.classList.add).toHaveBeenCalledWith('fadeOut');
    expect(domObject.classList.add).toHaveBeenLastCalledWith('fadeIn');
  });

  describe('plays game successfully: player vs comp', () => {
    let determineWinner;
    beforeEach(() => {
      jest.spyOn(Math, 'floor');
      jest.spyOn(Math, 'random');
      determineWinner = jest.spyOn(wrapper.vm, 'determineWinner');
      wrapper.setData({
        winnerText: 'Choose an option'
      });
      wrapper.find('button.paper').trigger('click');
    })
    it('plays the game', () => {
      expect(determineWinner.mock.calls[0][0]).toBe("paper");
      expect(Math.floor).toHaveBeenCalled();
      expect(Math.random).toHaveBeenCalled();
    });
  
    it('determineWinner compares hands and updates the DOM', () => {
      const setTimeout = jest.spyOn(window, 'setTimeout');
      const compareHands = jest.spyOn(wrapper.vm, 'compareHands');
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      jest.runOnlyPendingTimers();
      expect(compareHands).toHaveBeenCalled();
      expect(compareHands.mock.calls[0][0]).toBe("paper")
      expect(wrapper.vm.winnerText).not.toBe('Choose an option');
    });
  });

  describe('plays game successfully: comp vs comp', () => {
    let determineWinner;
    beforeEach(() => {
      jest.spyOn(Math, 'floor');
      jest.spyOn(Math, 'random');
      determineWinner = jest.spyOn(wrapper.vm, 'determineWinner');
      wrapper.setData({
        winnerText: 'Choose an option'
      });
      wrapper.find({ref: 'cvComp'}).trigger('click');
    })
    it('fades into the game on click', () => {
      expect(introScreen).toHaveBeenCalledWith(".intro");
      expect(match).toHaveBeenCalledWith(".match");
      expect(domObject.classList.add).toHaveBeenCalledWith('fadeOut');
      expect(domObject.classList.add).toHaveBeenLastCalledWith('fadeIn');
    });

    it('game starts playing automatically', () => {
      jest.spyOn(window, 'setInterval');
      const playGame = jest.spyOn(wrapper.vm, 'playGame');
      expect(determineWinner).toHaveBeenCalled();
      expect(window.setInterval).toHaveBeenCalled();
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 3000);
      jest.runOnlyPendingTimers();
      expect(playGame).toHaveBeenCalled();
    });
  });
});
