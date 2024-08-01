import { IRowNode } from 'ag-grid-community';
import 'ag-grid-enterprise'

const denominationOrder = new Map([
    ['Half Cent', 1], ['1/2C', 1],
    ['Large Cent', 2], ['1C', 2],
    ['Small Cent', 3],
    ['Two Cent Piece', 4], ['2C', 4],
    ['Three Cent Silver', 5], ['3CS', 5],
    ['Three Cent Nickel', 6], ['3CN', 6],
    ['Nickel', 7], ['5C', 7],
    ['Half Dime', 8], ['H10C', 8],
    ['Dime', 9], ['10C', 9],
    ['Twenty Cent Piece', 10], ['20C', 10],
    ['Quarter Dollar', 11], ['25C', 11],
    ['Half Dollar', 12], ['50C', 12],
    ['Dollar', 13], ['$1', 13],
    ['Silver Eagle', 14], ['Silver Commemorative', 14], ['S$1', 14],
    ['Gold Commemorative', 15], ['G$1', 15],
    ['Gold Dollar', 16], ['G$1', 16],
    ['Quarter Eagle', 17], ['G$2.50', 17],
    ['Half Eagle', 18], ['G$5', 18],
    ['Eagle', 19], ['Gold Eagle', 19], ['G$10', 19],
    ['Double Eagle', 20], ['G$20', 20],
    ['Three Dollar Gold Piece', 21], ['G$3', 21],
    ['Four Dollar Gold Piece', 22], ['G$4', 22],
    ['Half Eagle', 23], ['G$5', 23],
    ['Eagle', 24], ['G$10', 24],
    ['Double Eagle', 25], ['G$20', 25],
    ['S$2', 26], 
    ['S$5', 27], 
    ['S$10', 28], 
    ['S$20', 29], 
    ['S$50', 30],
    ['G$50', 31],
]);

const seriesOrder = new Map([
  // Half Cents
  ['Flowing Hair Half Cents', 1],
  ['Liberty Cap Half Cents', 2],
  ['Draped Bust Half Cents', 3],
  ['Classic Head Half Cents', 4],
  ['Braided Hair Half Cents', 5],

  // Cents
  ['Flowing Hair Large Cents', 6],
  ['Liberty Cap Large Cents', 7],
  ['Draped Bust Large Cents', 8],
  ['Classic Head Large Cents', 9],
  ['Coronet Head Large Cents', 10],
  ['Flying Eagle Cents', 11],
  ['Indian Head Cents', 12],
  ['Lincoln Wheat Cents', 13],
  ['Lincoln Memorial Cents', 14],
  ['Lincoln Shield Cents', 15],

  // Two Cents
  ['Two Cent Pieces', 16],

  // Three Cents
  ['Three Cent Silvers', 17],
  ['Three Cent Nickels', 18],

  // Nickels
  ['Shield Nickels', 19],
  ['Liberty Head Nickels', 20],
  ['Buffalo Nickels', 21],
  ['Jefferson Nickels', 22],

  // Half Dimes
  ['Flowing Hair Half Dimes', 23],
  ['Draped Bust Half Dimes', 24],
  ['Capped Bust Half Dimes', 25],
  ['Liberty Seated Half Dimes', 26],

  // Dimes
  ['Draped Bust Dimes', 27],
  ['Capped Bust Dimes', 28],
  ['Liberty Seated Dimes', 29],
  ['Barber Dimes', 30],
  ['Mercury Dimes', 31],
  ['Roosevelt Dimes', 32],

  // Twenty Cent Pieces
  ['Twenty Cent Pieces', 33],

  // Quarters
  ['Draped Bust Quarters', 34],
  ['Capped Bust Quarters', 35],
  ['Liberty Seated Quarters', 36],
  ['Barber Quarters', 37],
  ['Standing Liberty Quarters', 38],
  ['Washington Quarters', 39],

  // Half Dollars
  ['Flowing Hair Half Dollars', 40],
  ['Draped Bust Half Dollars', 41],
  ['Capped Bust Half Dollars', 42],
  ['Liberty Seated Half Dollars', 43],
  ['Barber Half Dollars', 44],
  ['Walking Liberty Half Dollars', 45],
  ['Franklin Half Dollars', 46],
  ['Kennedy Half Dollars', 47],

  // Silver Dollars
  ['Flowing Hair Dollars', 48],
  ['Draped Bust Dollars', 49],
  ['Gobrecht Dollars', 50],
  ['Liberty Seated Dollars', 51],
  ['Morgan Dollars', 52],
  ['Peace Dollars', 53],
  ['Eisenhower Dollars', 54],
  ['Susan B. Anthony Dollars', 55],
  ['Sacagawea Dollars', 56],
  ['Presidential Dollars', 57],
  ['American Innovation Dollars', 58],

  // Trade Dollars
  ['Trade Dollars', 59],

  // Gold Dollars
  ['Liberty Head Gold Dollars', 60],
  ['Indian Princess Gold Dollars', 61],

  // Quarter Eagles
  ['Capped Bust Quarter Eagles', 62],
  ['Classic Head Quarter Eagles', 63],
  ['Liberty Head Quarter Eagles', 64],
  ['Indian Head Quarter Eagles', 65],

  // Three Dollar Gold Pieces
  ['Three Dollar Gold Pieces', 66],

  // Four Dollar Gold Pieces
  ['Stella Four Dollar Gold Pieces', 67],

  // Half Eagles
  ['Capped Bust Half Eagles', 68],
  ['Classic Head Half Eagles', 69],
  ['Liberty Head Half Eagles', 70],
  ['Indian Head Half Eagles', 71],

  // Eagles
  ['Capped Bust Eagles', 72],
  ['Liberty Head Eagles', 73],
  ['Indian Head Eagles', 74],

  // Double Eagles
  ['Liberty Head Double Eagles', 75],
  ['Saint-Gaudens Double Eagles', 76],

  // Commemoratives
  ['Classic Commemoratives', 77],
  ['Modern Commemoratives', 78],

  // Bullion
  ['American Eagles', 79],
  ['American Buffalos', 80],
]);

export const RedbookSort = <TData extends { 
    denomination: string | null; 
    series: string | null; 
    year: number | null;
    quantity: number | null;
  }>(
    valueA: string | null | undefined,
    valueB: string | null | undefined,
    nodeA: IRowNode<TData>,
    nodeB: IRowNode<TData>,
    isDescending: boolean
  ): number => {
    const dataA = nodeA.data || {} as TData;
    const dataB = nodeB.data || {} as TData;
  
    // First, sort by quantity (items with quantity 0 go to the end)
    const quantityA = dataA.quantity || 0;
    const quantityB = dataB.quantity || 0;
    if (quantityA === 0 && quantityB !== 0) return 1;
    if (quantityA !== 0 && quantityB === 0) return -1;
  
    const denomA = dataA.denomination || '';
    const denomB = dataB.denomination || '';
    
    // Use denominationOrder map for sorting denominations
    const denomOrderA = denominationOrder.get(denomA) || Infinity;
    const denomOrderB = denominationOrder.get(denomB) || Infinity;
    if (denomOrderA !== denomOrderB) {
      return denomOrderA - denomOrderB;
    }
  
    const seriesA = dataA.series || '';
    const seriesB = dataB.series || '';
    
    // Use seriesOrder map for sorting series
    const seriesOrderA = seriesOrder.get(seriesA) || Infinity;
    const seriesOrderB = seriesOrder.get(seriesB) || Infinity;
    if (seriesOrderA !== seriesOrderB) {
      return seriesOrderA - seriesOrderB;
    }
  
    const yearA = dataA.year || 0;
    const yearB = dataB.year || 0;
    return yearA - yearB;
  };