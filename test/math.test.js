import { expect, test } from 'vitest';
import { square } from '../src/index.js';

for(let i = 0; i < 100; i++){
    let a = Math.floor(Math.random()*(i+1))
    test("square numbers",()=>{
        expect(square(a)).toBe(a**2)
    })
}