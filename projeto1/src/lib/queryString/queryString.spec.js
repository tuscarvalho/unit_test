import { queryString, parse } from "./queryString.js";

describe('Object to query string', () => {
    it('should create a valid query string when an object is provide', () => {
        const obj = {
            name: 'Fabio',
            profession: 'developer'
        };

        expect(queryString(obj)).toBe('name=Fabio&profession=developer');
    });

    it('should create a valid query string even when an array is passed as value', () => {
        const obj = {
            name: 'Fabio',
            abilities: ['JS', 'TDD']
        };

        expect(queryString(obj)).toBe('name=Fabio&abilities=JS,TDD');
    });

    it('should throw an error when an object is passed as value', () => {
        const obj = {
            name: 'Fabio',
            abilities: {
                first: 'JS',
                second: 'TDD'
            }
        };

        expect(() => {
            queryString(obj);
        }).toThrow(); 
    });
});

describe('Query string to object', () => {
    it('should convert a query string of a single key-value object ', () => {
        const qs = 'name=Fabio&profession=developer';
        expect(parse(qs)).toEqual({
            name: 'Fabio',
            profession: 'developer'
        });
    });

    it('should  convert a query string to an object taking care of comma separated values ', () => {
        const qs = 'name=Fabio&abilities=JS,TDD';
        expect(parse(qs)).toEqual({
            name: 'Fabio',
            abilities: ['JS', 'TDD'],
        })
    });
});